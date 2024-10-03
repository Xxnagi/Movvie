import Hero from "../components/home/Hero";
import List from "../components/home/List";

export default function Home() {
  return (
    <main className="bg-black">
      <Hero />
      <List category="now_playing" />
      <List category="popular" />
      <List category="top_rated" />
      <List category="upcoming" />
    </main>
  );
}
