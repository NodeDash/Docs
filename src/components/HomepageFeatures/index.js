import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Device Management',
    Svg: require('@site/static/img/device-management.svg').default,
    description: (
      <>
        Register, monitor, and manage your entire fleet of IoT devices. Track device status, 
        organize with labels, and receive notifications about device health and connectivity.
      </>
    ),
  },
  {
    title: 'Visual Workflow Builder',
    Svg: require('@site/static/img/flow-builder.svg').default,
    description: (
      <>
        Create powerful data processing pipelines with our intuitive drag-and-drop flow editor.
        Connect devices, functions, and integrations without writing complex code.
      </>
    ),
  },
  {
    title: 'Custom Functions',
    Svg: require('@site/static/img/functions.svg').default,
    description: (
      <>
        Transform and process your IoT data with JavaScript functions. Filter, aggregate, 
        and enhance your device data with our built-in code editor and function templates.
      </>
    ),
  },
  {
    title: 'Integrations',
    Svg: require('@site/static/img/integrations.svg').default,
    description: (
      <>
        Connect your IoT data to external systems, databases, and services. 
        Use built-in integrations for HTTP, MQTT, and more, or create custom connections.
      </>
    ),
  },
  {
    title: 'Device Labels',
    Svg: require('@site/static/img/labels.svg').default,
    description: (
      <>
        Organize devices with customizable labels for location, type, or any other criteria.
        Create flows that target specific device groups and simplify fleet management.
      </>
    ),
  },
  {
    title: 'Data Storage',
    Svg: require('@site/static/img/storage.svg').default,
    description: (
      <>
        Store and retrieve your device data with configurable database options. 
        Keep your IoT data secure and accessible for analytics, visualization, and reporting.
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        {Svg ? <Svg className={styles.featureSvg} role="img" /> : 
          <div className={styles.featureIconPlaceholder} />
        }
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="text--center margin-bottom--xl">
          <Heading as="h2">Key Features</Heading>
          <p>Simplify IoT management and automation with our powerful platform</p>
        </div>
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
