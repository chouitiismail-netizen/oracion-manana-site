import HomeClient from '../components/HomeClient';
import { getSpiritualPages } from '../lib/content';
import { HomePageJsonLd } from '../components/JsonLd';

export default function HomePage() {
  const allPages = getSpiritualPages();

  return (
    <>
      <HomePageJsonLd />
      <HomeClient allPages={allPages} />
    </>
  );
}
