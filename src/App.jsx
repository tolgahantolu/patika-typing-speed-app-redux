import { Content, Footer, Header, Language, Results } from "./components";

function App() {
  return (
    <div className="w-3/4 mx-auto py-10">
      <Header />
      <div className="w-full h-full mt-14">
        <Language />
        <Content />
      </div>
      <Results />
      <Footer />
    </div>
  );
}

export default App;
