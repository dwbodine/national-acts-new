"use client";

import { Col, Row } from "react-bootstrap";
import { FaFacebook, FaGlobe, FaInstagram, FaSpotify, FaTwitter, FaYoutube } from 'react-icons/fa';
import { ArtistBoxProps } from "@/types/props";
import parse from 'html-react-parser';
import { useGetDisplayAddress } from "@/hooks/useGetDisplayAddress";

export default function VenueBox(props: ArtistBoxProps) {

    const { getDisplayAddress } = useGetDisplayAddress();

    const id = props.SellerId;
    const displayName = props.DisplayName;
    const showDisplayName = props.ShowDisplayName ?? false;
    const website = props.Website;
    const facebook = props.Facebook;
    const twitter = props.Twitter;
    const instagram = props.Instagram;
    const youtube = props.Youtube;
    const spotify = props.Spotify;
    const hasSocial = (website || facebook || twitter || instagram || youtube || spotify);

    const addressBlock = getDisplayAddress(props);    

    return (
        <Col md={6} sm={12} className="artist-box-col" key={`artist_box_${id}`}>
            <Row>
                <Col>
                    <h1 hidden={!showDisplayName}>{displayName}</h1>
                    <p hidden={addressBlock.length === 0}>{parse(addressBlock)}</p>
                </Col>
            </Row>
            <Row hidden={!hasSocial}>
                <Col className="social-network-container">
                    <ul className="social-network social-circle">
                        <li hidden={!website}><a href={website} target="_blank" className="icoWebsite" title="Website"><FaGlobe /></a></li>
                        <li hidden={!facebook}><a href={facebook} target="_blank" className="icoFacebook" title="Facebook"><FaFacebook /></a></li>
                        <li hidden={!twitter}><a href={twitter} target="_blank" className="icoTwitter" title="Twitter"><FaTwitter /></a></li>
                        <li hidden={!instagram}><a href={instagram} target="_blank" className="icoInstagram" title="Instagram"><FaInstagram /></a></li>
                        <li hidden={!youtube}><a href={youtube} target="_blank" className="icoYouTube" title="YouTube"><FaYoutube /></a></li>
                        <li hidden={!spotify}><a href={spotify} target="_blank" className="icoSpotify" title="Spotify"><FaSpotify /></a></li>
                    </ul>
                </Col>
            </Row>
        </Col>
    );
}