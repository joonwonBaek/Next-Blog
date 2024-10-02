import { Metadata } from 'next';

import { RESUME_DATA } from '@/data/portfolio-data';

export const metadata: Metadata = {
  title: `${RESUME_DATA.name} | ${RESUME_DATA.about}`,
  description: RESUME_DATA.summary,
};

const PortfolioPage = () => {
  return (
    <main>
      <section>
        <div>
          <h1></h1>
          <p></p>
          <p></p>
          <div></div>
          <div></div>
        </div>
      </section>
    </main>
  );
};

export default PortfolioPage;
