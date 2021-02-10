import { createInterface } from "readline";
import { evaluate } from "./calc";

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

const question = (): Promise<void> =>
  new Promise((resolve) => {
    rl.question("> ", (answer: string) => {
      answer = answer.trim();

      if(answer.length === 0) {
        resolve();
        return;
      }

    if(["quit", "exit", "bye"].includes(answer.toLowerCase())) {
      console.log("Bye!");
      process.exit(0);
    }

    const result: number = evaluate(answer);

    console.log(result);
    resolve();
    });
  });

async function app(): Promise<void> {
  console.log("Enter your equation:");
  while(true) {
    await question();
  }
}

app();
