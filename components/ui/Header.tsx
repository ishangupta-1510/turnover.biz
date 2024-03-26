import {getCurrentUser} from "@/lib/user";
import {Search, ShoppingCart} from "lucide-react";
import Logout from "../Logout";

export default async function Header() {
  const user = await getCurrentUser();
  return (
    <header>
      <nav className="flex justify-between items-center h-[100px] box-border p-12">
        <div className="flex flex-col w-full">
          <div className="flex justify-end space-x-3">
            <span>Help</span>
            <span>Orders & Return</span>
            <span className="capitalize">Hi, {user?.name || "User"}</span>
            {user && <Logout />}
          </div>
          <div className="flex items-center justify-between">
            <div className="text-[32px] font-[700] uppercase">Ecommerce</div>
            <div className="space-x-12 flex items-center justify-between text-[16px] font-[600]">
              <span>Categories</span>
              <span>Sale</span>
              <span>Clearance</span>
              <span>New stock</span>
              <span>Trending</span>
            </div>
            <div className="flex justify-between space-x-4">
              <span>
                <Search className="w-[32px] text-[32px]" />
              </span>
              <span>
                <ShoppingCart className="w-[32px] text-[32px] " />
              </span>
            </div>
          </div>
        </div>
      </nav>
      <div className="bg-[#F4F4F4] flex items-center justify-center h-[36px]">
        <section className="flex items-center space-x-5 ">
          <p className="w-[16px]">&lt; </p>
          <p className="text-[14px] font-[500]">
            Get 10% off on business sign up{" "}
          </p>
          <p className=" w-[16px]">&gt;</p>
        </section>
      </div>
    </header>
  );
}
