import { useSelector } from "react-redux";

function App() {
  const helloWorld = useSelector((state) => state.typing.helloWorld);
  return (
    <div className="">
      <h1 className="text-3xl font-bold">{helloWorld}</h1>
    </div>
  );
}

export default App;
