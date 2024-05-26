import proposalifyLogo from '../public/logo.png';
import Image from 'next/image';
import Link from 'next/link';
import BookIcon from '../public/book.png';
import Rekapitulasi from '../public/rekapitulasi.png';
import Setting from '../public/setting.png';

import {
    Card,
    List,
    ListItem,
} from "@material-tailwind/react";
import { useState } from 'react';

function DefaultSidebar() {
    const [selectedItem, setSelectedItem] = useState("");
    
    // Data untuk menampilkan setiap ListItem
    const menuItems = [
        { id: "adminproposal", icon: BookIcon, label: "Proposal", href: "/adminproposal" },
        { id: "rekapitulasi", icon: Rekapitulasi, label: "Rekapitulasi", href: "/rekapitulasi" },
        { id: "profiledosen", icon: BookIcon, label: "Profile Dosen", href: "/profiledosen" },
        { id: "pengaturan", icon: Setting, label: "Pengaturan", href: "/pengaturan" }
    ];

    return (
        <div className="h-screen flex flex-col justify-between">
            <Card className="flex flex-col justify-between min-h-screen max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
                <div>
                    <div className="flex items-center">
                        <Link href="/">
                            <Image src={proposalifyLogo} alt="Logo" width={40} height={40} className="mr-2" />
                        </Link>
                        <span className="text-black font-semibold text-lg">Proposalify</span>
                    </div>
                    <List className='mt-10'>
                        {menuItems.map((menuItem) => (
                            <Link key={menuItem.id} href={menuItem.href}>
                                <ListItem
                                    onClick={() => setSelectedItem(menuItem.id)}
                                    className={`${selectedItem === menuItem.id ? "bg-blue-500 text-white" : "text-black"}`}
                                    style={{ padding: "10px", marginBottom: "10px" }}
                                >
                                    <Image src={menuItem.icon} alt="Logo" width={20} height={20} className="mr-2" />
                                    <span className="font-serif text-lg">{menuItem.label}</span>
                                </ListItem>
                            </Link>
                        ))}
                    </List>
                </div>
            </Card>
        </div>
    );
}

export default DefaultSidebar;
