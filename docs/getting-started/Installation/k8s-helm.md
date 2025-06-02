---
sidebar_position: 1
---

# Kubernetes + Helm
Kubernetes offers the most production ready deployment of NodeDash including opportunity for high
availability and horizontal scaling.

## System Requirements
### Minimum Requirements
- **Kubernetes Cluster**: Version 1.19 or newer
- **Helm**: Version 3.0 or newer
- **CPU**: Minimum 4 vCPU available within cluster
- **CPU Architecture**: x86_64 / arm64 supported
- **RAM**: Minimum 8GB RAM available within cluster
- **PVC**: 20GB disk available

You may require further resources depending on the size of your deployment.

## Theory
The Helm chart contains everything you need to get the application deployed in an operational manner including;

- **DB**: PostgreSQL 17.4
- **Key Value**: ValKey 8.1.1
- **NodeDash Services**:
  - API
  - Ingest Service
  - Backend Service
  - UX

It does not include the LoRaWAN Network Server such as ChirpStack. This should be deployed alongside NodeDash
and can be configured with upstream Helm charts from ChirpStack available at - https://artifacthub.io/packages/helm/beeinventor/chirpstack.

Although the Helm chart includes everything you need to get started you may wish to tweak it, for example instead of using
the built in PostgreSQL DB you may wish to consume your cloud provider's maaged service such as AWS RDS or Digital Ocean 
DBaaS. If you wish to switch out options such as these you may update the values.yaml before installation to disable the
built in database and provide an alternative connection string. Further details on the values which may be tweaked
prior to installation can be found within the Helm chart's README.md at https://github.com/NodeDash/Helm/blob/main/README.md.

By design the Helm chart does not include any ingress and simply creates Cluster IPs for each of the services. This is 
intended so that deployers may choose their own ingress mechanism based on their needs. Commonly used ingress options include
Cloudflared to tunnel via Cloudflare Zero Trust or NGINX Ingress controller. Sample YAML describing how to configure ingress
is provided later in this guide.

## Installation

### Clone Helm Charts Repo
First off clone the Helm Charts repo.

```bash
git clone git@github.com:NodeDash/Helm.git
cd Helm
```

If you wish to install the latest development release you can skip the next step.

If you wish to specify a release to deploy you should checkout the tag you wish to deploy, for example to deploy version 0.0.10

```bash
git checkout 0.0.10
```

### Edit values.yaml
You should now edit your values.yaml file as appropriate. To find out more about configuration values please review the README.md
file within the Helm chart at - https://github.com/NodeDash/Helm/blob/main/README.md.

```bash
vi node-dash/values.yaml
```

### Prepare for installation
You should prepare for installation by;

- Ensuring your KUBECONFIG environment variable is set for the K8s cluster you wish to deploy to.
```bash
export KUBECONFIG=~/k8s/my-cluster.yaml
```
- Your values.yaml are set as appropriate for your deployment.
- We recommend deploying to a separate namespace to segregate NodeDash from your other apps, if you wish to create a namespace do it now.
```bash
kubectl create namespace my-nodedash
```

### Run installation
Run the install command to install to your Kubernetes cluster (this may take several minutes).
Substitute the namespace and installation name as appropriate.
```bash
helm -n my-nodedash install my-nodedash node-dash/
```

### Review installed components
Once the install has completed you can check the relevant components have been installed using kubectl...

```bash
kubectl -n my-node-dash get pods
```

```bash
NAME                                         READY   STATUS    RESTARTS      AGE
my-nodedash-api-7c5b765f88-hbpws       1/1     Running   0             38s
my-nodedash-ingest-5ccf58d446-wzfcf    1/1     Running   0             38s
my-nodedash-postgres-0                 1/1     Running   0             38s
my-nodedash-service-65b6fdcc55-6q4qf   1/1     Running   0             38s
my-nodedash-ux-76d68cf7d6-44h7k        1/1     Running   0             38s
my-nodedash-valkey-0                   1/1     Running   0             38s
```

```bash
kubectl -n my-nodedash get svc
```

```bash
NAME                         TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)    AGE
my-nodedash-api        ClusterIP   10.109.12.64    <none>        8000/TCP   72s
my-nodedash-ingest     ClusterIP   10.109.7.163    <none>        8000/TCP   72s
my-nodedash-postgres   ClusterIP   10.109.1.241    <none>        5432/TCP   72s
my-nodedash-ux         ClusterIP   10.109.5.24     <none>        3000/TCP   72s
my-nodedash-valkey     ClusterIP   10.109.18.160   <none>        6379/TCP   72s
```

Make a note of the Cluster IPs and ports as these can be used to configure your ingress.

## Upgrade
To upgrade your installation checkout the version you wish to upgrade to using the git tag...

```bash
git checkout 1.0.0
```

Edit the values.yaml as appropriate and run the upgrade command including your namespace name and deployment name.

```bash
helm -n my-nodedash upgrade my-nodedash node-dash/
```

This will upgrade your deployment to the new version including running database migrations.

If you have forgotten your deployment name you may retrieve is with the helm ls command.

```bash
helm ls -A
```

## Removal
If you wish to uninstall your NodeDash deployment you may complete this by running the Helm uninstall command.
Substitute in your namespace name and deployment name as appropriate.

```bash
helm -n my-nodedash uninstall my-nodedash
```

## Configuring Ingress
The Helm chart only deploys the application and does not define any ingress providing you the freedom
on how to expose the app to the internet. Popular ways to expose the app include;

- NGINX Ingress Controller
- CloudflareD Tunnel

### NGINX Ingress Controller
#### Pre-requisites
To use NGINX Ingress Controller you'll need the following;

- NGINX Ingress Controller deploy to your cluster - https://github.com/kubernetes/ingress-nginx
- CertificateManager deployed to your cluster - https://cert-manager.io/docs/installation/
- CertificateManager configured for LetsEncrypt or another certificate provider - https://cert-manager.io/docs/configuration/
- A domain name and access to add DNS records

#### Create YAML to define ingress
Create a YAML file to define your ingress called ingress.yaml. Substitute the hostname you'd like to expose your services and
the app selector with the name of your deployment as appropriate.

```yaml
---
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  annotations:
    cert-manager.io/cluster-issuer: letsencrypt
  labels:
    app: my-nodedash-ux
  name: my-nodedash-ux
spec:
  ingressClassName: nginx
  rules:
  - host: nodedash.example.com
    http:
      paths:
      - backend:
          service:
            name: my-nodedash-ux
            port:
              number: 3000
        path: /
        pathType: Prefix
  tls:
  - hosts:
    - nodedash.example.com
    secretName: nodedash-ux-ingress-tls
---
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  annotations:
    cert-manager.io/cluster-issuer: letsencrypt
  labels:
    app: my-nodedash-api
  name: my-nodedash-api
spec:
  ingressClassName: nginx
  rules:
  - host: nodedash-api.example.com
    http:
      paths:
      - backend:
          service:
            name: my-nodedash-api
            port:
              number: 8000
        path: /
        pathType: Prefix
  tls:
  - hosts:
    - nodedash-api.example.com
    secretName: nodedash-api-ingress-tls
---
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  annotations:
    cert-manager.io/cluster-issuer: letsencrypt
  labels:
    app: my-nodedash-ingest
  name: my-nodedash-ingest
spec:
  ingressClassName: nginx
  rules:
  - host: nodedash-ingest.example.com
    http:
      paths:
      - backend:
          service:
            name: my-nodedash-ingest
            port:
              number: 8000
        path: /
        pathType: Prefix
  tls:
  - hosts:
    - nodedash-ingest.example.com
    secretName: nodedash-ingest-ingress-tls
```

#### Apply YAML Config
Create the ingress to your deployment using kubectl command, substitute your namespace as required.

```bash
kubectl -n my-nodedash apply -f ingress.yaml
```

You ingress will now be created using the nginx ingress class and SSL certificates issues via the letsencrypt issuer
within Certificate Manager.

#### Create DNS Records
Before your ingress will function you'll need to create DNS entries for your hostnames and await certificate issuance
via Certificate Manager. Access will work once DNS entries are added prior to certificates being issued however browsers
will experience an SSL warning page.

Fetch your ingress controllers Load Balancer IP Address

```bash
kubectl get svc
```

```bash
NAME                         TYPE           CLUSTER-IP      EXTERNAL-IP     PORT(S)          AGE
nginx-ingress                LoadBalancer   10.109.12.64    66.231.76.42    80/TCP,443/TCP   20m
```

Configure your DNS entries at your DNS provider substituting your domain name and ingress load balancer IP...

```
HOSTNAME                              RECORD TYPE   VALUE           TTL
nodedash.example.com            A             66.231.76.42    300
nodedash-ingest.example.com     A             66.231.76.42    300
nodedash-api.example.com        A             66.231.76.42    300
```

#### Test Access
All being well you should now be able to access your instance of NodeDash via the configured hostname.
