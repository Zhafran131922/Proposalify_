import {
    Card,
    CardBody,
    Typography,
    Button
} from "@material-tailwind/react";
import Image from 'next/image'
import BookIcon from '../public/book.png'
import { CardHeader } from "react-bootstrap";

function SimpleCard({ title, content }) {
    return (
      
        <Card className="w-96 rounded-md bg-white drop-shadow-sm p-2">
           
            
                <div className="flex justify-between items-center">
                    <Typography variant="h5" color="blue-gray" className="font-bold text-4xl">
                        {title}
                    </Typography>
                    <Image src={BookIcon} alt="" className="w-12 h-12" />
                </div>
                <Typography className="font-semibold">
                    {content}
                </Typography>
           
        </Card>
    );
}

export default SimpleCard;
