import styles from './PayOnDelivery.module.css';

const steps = [
  {
    title: 'Fill the form',
    description: 'Choose your quantity, then enter your name, phone number, and delivery address.',
  },
  {
    title: 'We call to confirm',
    description: 'Our team calls to confirm your order and arrange your delivery details.',
  },
  {
    title: 'Pay on delivery',
    description: 'Your glass container set arrives at your doorstep. Receive your order, then pay the rider.',
  },
];

export default function PayOnDelivery() {
  return (
    <section id="pay-on-delivery" className={styles.section} aria-labelledby="delivery-heading">
      <div className="shell">
        <div className={styles.intro}>
          <p className={styles.eyebrow}>Simple process</p>
          <h2 id="delivery-heading">How <em>pay on delivery</em> works</h2>
          <p className={styles.lede}>
            No upfront payment. Your glass container set comes to you &mdash; then you pay.
          </p>
        </div>
        <ol className={styles.steps} role="list">
          {steps.map((step, index) => (
            <li className={styles.card} key={step.title}>
              <span className={styles.number} aria-hidden="true">{index + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
