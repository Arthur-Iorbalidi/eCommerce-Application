import collaborationMethods from './teamCollaborationData';

import styles from './teamCollaboration.module.scss';

const TeamCollaboration: React.FC = () => {
  return (
    <section className={styles.collaboration_section}>
      <h2>Team collaboration methods:</h2>
      <div className={styles.collaboration_methods}>
        {collaborationMethods.map((method, index) => (
          <ul
            key={method.id}
            className={`${styles.collaboration_methods_item} ${index % 2 === 0 ? styles.even : styles.odd}`}
          >
            <li>
              <h5>{method.name}</h5>
              {/* {method.description} */}
            </li>
          </ul>
        ))}
      </div>
    </section>
  );
};

export default TeamCollaboration;
