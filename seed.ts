import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcryptjs";
const db=new PrismaClient();
async function main(){
 const email=process.env.OWNER_EMAIL||"owner@example.com"; const pass=process.env.OWNER_PASSWORD||"ChangeMe123!";
 const hash=await bcrypt.hash(pass,12);
 await db.user.upsert({where:{email},update:{},create:{email,name:"NOBIKSH Owner",passwordHash:hash,role:Role.OWNER}});
 const cats=["রাজনীতি","জাতীয়","আন্তর্জাতিক","ঢাকা","বরিশাল","পটুয়াখালী","স্থানীয়","অর্থনীতি","শিক্ষা","প্রযুক্তি","খেলাধুলা","বিনোদন","মতামত"];
 for(const name of cats){await db.category.upsert({where:{name},update:{},create:{name,slug:name.replace(/\s+/g,"-")}})}
 console.log(`Owner ready: ${email}`);
}
main().finally(()=>db.$disconnect());