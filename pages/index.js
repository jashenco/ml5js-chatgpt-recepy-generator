import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [ingredientsInput, setIngredientsInput] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ingredients: ingredientsInput }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      console.log(data.result);

      setResult(data.result);

      setIngredientsInput("");
    } catch(error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div>
      <Head>
        <title>Recepy generator</title>
        <link rel="icon" href="/salad.png" />
      </Head>

      <main className={styles.main}>
      <img src="/salad.png" className={styles.icon} />
        <h3>Enter ingredients</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="ingredients"
            placeholder="Enter ingredients"
            value={ingredientsInput}
            onChange={(e) => setIngredientsInput(e.target.value)}
          />
          <input type="submit" value="Generate recepy" />
        </form>
        <div className={styles.result}>
          {result}
        </div>
      </main>
    </div>
  );
}
