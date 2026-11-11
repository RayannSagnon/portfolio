import { redirect } from "next/navigation";

// Every project is listed on the home page.
export default function Page() {
  redirect("/#work");
}
