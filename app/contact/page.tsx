import { redirect } from "next/navigation";

// The contact section closes the home page.
export default function Page() {
  redirect("/#contact");
}
