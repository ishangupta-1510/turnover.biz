import { getOtp } from "@/lib/getotp";
import { getCurrentUser } from "@/lib/user";
import Link from "next/link";
import { redirect } from "next/navigation";

const obscureEmail = (email: string) => {
  const [name, domain] = email.split("@");
  return `${name.slice(0, 3)}${new Array(name.length).join("*")}@${domain}`;
};

export default async function VerifyEmail() {
  const user = await getCurrentUser();
  const otp = await getOtp();
  console.log(otp);
  if (!user) {
    return redirect("/register");
  }
  return (
    <div className="w-full flex items-center justify-center p-3 mt-4 box-border">
      <form className="bg-white shadow-md px-8 pt-6 pb-8 mb-4 h-[453px] w-[576px] rounded-[20px] border-[1px] border-[#C1C1C1] space-y-14 flex flex-col">
        <div className="text-center text-[32px] font-[600] space-y-7">
          <section>Verify your email</section>
          <section>
            <p className="text-[16px] font-[500] w-[334px] mx-auto">
              Enter the 8 digit code you have received on{" "}
              {obscureEmail(user.email as string)}
            </p>
          </section>
        </div>
        <div className="space-y-2">
          <p className="text-[16px] text-[400]">Code</p>
          <section className="flex justify-between items-end ">
            {Array.from({ length: 8 }, (_, i) => (
              <div key={i}>
                <input
                  inputMode="numeric"
                  type="text"
                  pattern="[0-9]*"
                  maxLength={1}
                  className="w-[46px] h-[48px] border-[1px] border-[#C1C1C1] p-4 rounded-[6px] text-[22px]"
                />
              </div>
            ))}
          </section>
        </div>

        <Link
          href="/dashboard"
          className="bg-black text-white mx-auto  p-2 rounded-md uppercase w-[456px] disabled:opacity-80 text-center"
        >
          Verify
        </Link>
      </form>
    </div>
  );
}
