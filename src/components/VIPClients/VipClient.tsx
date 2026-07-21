"use client";

import { Col } from "react-bootstrap";
import { PageProps } from "@/types/props";
import { useRouter } from 'next/navigation';

export default function VipClient(props: PageProps) {
    const { page } = props;
    const router = useRouter();
    const goToClient = (route: string) => {
        router.push(`/${route}`);
    };

    return <Col lg={6} xl={4} className="featImgContainer" onClick={() => goToClient(page.route)} style={{backgroundImage: `url(${process.env.NEXT_PUBLIC_THUMBNAILS_URL}${page.thumbnail})`}}></Col>;
}