/* eslint-disable react/jsx-one-expression-per-line */
import { Link } from 'react-router-dom';

import RSSchoolLogo from '../../assets/images/AboutPage/rss-logo.svg';
import TeamMembers from './components/teamMembers/teamMembers';
import TeamCollaboration from './components/teamCollaboration/teamCollaboration';

import styles from './about.module.scss';

const About: React.FC = () => {
  return (
    <div className={styles.about_wrapper}>
      <div className={styles.about_container}>
        <section className={styles.about_project_section}>
          <h1>About Us</h1>
          <p>
            <span className={styles.shop_name}>E-shop</span>- a comprehensive
            Portal for Interactive and Seamless Shopping Experiences.
            <br /> E-commerce shop was created for the
            <Link to="https://rs.school/">
              <img
                className={styles.school_logo}
                alt="RS-logo"
                src={RSSchoolLogo}
              />
            </Link>
          </p>
        </section>
        <TeamMembers />
        <TeamCollaboration />
      </div>
    </div>
  );
};

export default About;
