import React from 'react';
import { Link } from 'react-router-dom';
import { FaGithub } from 'react-icons/fa';

import teamMembers from './teamMembersData';

import styles from './teamMembers.module.scss';

const TeamMembers: React.FC = () => {
  return (
    <section className={styles.team_members_section}>
      <h2>Our Team</h2>
      <div className={styles.team_members}>
        {teamMembers.map((member, index) => (
          <div
            key={member.id}
            className={`${styles.team_member_card} ${index % 2 === 0 ? styles.team_member_card_even : styles.team_member_card_odd}`}
          >
            <img alt={member.name} src={member.photo} />

            <Link
              className={styles.team_member_mainInfo}
              to={member.githubLink}
              target="_blank"
            >
              <h3 className={styles.team_member_name}>{member.name}</h3>
              <p>
                <FaGithub className={styles.github_icon} />
              </p>
            </Link>

            <p className={styles.team_member_role}>{member.role}</p>

            <p className={styles.team_member_bio}>{member.bio}</p>

            <div className={styles.team_member_contributions}>
              <h5>Contributions:</h5>
              <ul className="contributions-list">
                {member.contributions.map((contribution) => (
                  <li key={contribution}>{contribution}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TeamMembers;
