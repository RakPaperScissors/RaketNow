import Header from './components/Header';
import Footer from './components/Footer';
import CardList from './components/CardList';

function App() {
  return (
    <>
      <Header />

      <main className="py-10 px-4 bg-gray-50 min-h-[80vh]">
        <CardList />
      </main>

      <Footer />
    </>
  );
}

export default App;
