"use client";

import { Col, Container, Row } from "react-bootstrap";
import type { FanMoment, MomentsFilterOptionsResponse } from "@/types/moments";
import MomentsFilterDialog, { type MomentsFilterValues } from "./MomentsFilterDialog";
import MomentsPhotoViewer, { type PhotoViewerItem } from "./MomentsPhotoViewer";
import { useEffect, useState } from "react";
import MomentsFilter from "./MomentsFilter";
import MomentsHeader from "./MomentsHeader";

const latestMomentCount = 8;

const emptyFilterValues: MomentsFilterValues = {
    band: '',
    date: '',
    location: '',
};

const getMomentAltText = (moment: FanMoment): string =>
    [
        moment.key.sellerName,
        moment.key.eventTitle,
        moment.key.eventLocation,
        moment.key.momentDate,
    ]
        .filter(Boolean)
        .join(' - ') || 'Fan moment';

const getMomentImages = (moment: FanMoment): string[] =>
    moment.images && moment.images.length > 0
        ? moment.images
        : [moment.key.filename].filter((image): image is string => Boolean(image));

const getMomentPath = (moment: FanMoment, image: string): string => {
    const baseUrl = process.env.NEXT_PUBLIC_MOMENTS_URL ?? '';
    const normalizedBaseUrl = baseUrl.replace(/\/$/u, '');

    return `${normalizedBaseUrl}/${moment.key.momentDate}/${moment.key.eventId}/${image}`;
};

const mapFanMomentToPhotoViewerItems = (moment: FanMoment): PhotoViewerItem[] =>
    getMomentImages(moment).map((image) => ({
        alt: getMomentAltText(moment),
        foregroundHeight: 416,
        foregroundImage: getMomentPath(moment, image),
        foregroundWidth: 416,
    }));

const mapFanMomentsToPhotoViewerItems = (moments: FanMoment[]): PhotoViewerItem[] =>
    moments.flatMap(mapFanMomentToPhotoViewerItems);

const getMomentFilterUrl = (values?: MomentsFilterValues): string => {
    const searchParams = new URLSearchParams();

    if (values?.date) {
        searchParams.set('startDate', values.date);
    }

    if (values?.band) {
        searchParams.set('sellerId', values.band);
    }

    if (values?.location) {
        searchParams.set('eventId', values.location);
    }

    const queryString = searchParams.toString();

    return queryString ? `/api/moments/filter?${queryString}` : '/api/moments/filter';
};

const hasMomentFilters = (values?: MomentsFilterValues): boolean =>
    Boolean(values?.date || values?.band || values?.location);

const getMomentItems = async (values?: MomentsFilterValues): Promise<PhotoViewerItem[]> => {
    const response = await fetch(getMomentFilterUrl(values));

    if (!response.ok) {
        return [];
    }

    const fanMoments = (await response.json()) as FanMoment[];
    const moments = mapFanMomentsToPhotoViewerItems(fanMoments);

    return hasMomentFilters(values) ? moments : moments.slice(0, latestMomentCount);
};

export default function FanMoments() {
    const [filterOptions, setFilterOptions] = useState<MomentsFilterOptionsResponse>({
        activeDates: [],
        bandOptions: [],
        locationOptions: [],
    });
    const [filterValues, setFilterValues] = useState<MomentsFilterValues>(emptyFilterValues);
    const [momentItems, setMomentItems] = useState<PhotoViewerItem[]>([]);
    const [showFilterDialog, setShowFilterDialog] = useState(false);

    useEffect(() => {
        let shouldUpdate = true;

        const loadFilterOptions = async () => {
            const response = await fetch('/api/moments/filter-options');

            if (!response.ok) {
                return;
            }

            const options = (await response.json()) as MomentsFilterOptionsResponse;

            if (shouldUpdate) {
                setFilterOptions(options);
            }
        };

        const loadLatestMoments = async () => {
            const moments = await getMomentItems();

            if (shouldUpdate) {
                setMomentItems(moments);
            }
        };

        loadFilterOptions().catch(() => undefined);
        loadLatestMoments().catch(() => undefined);

        return () => {
            shouldUpdate = false;
        };
    }, []);

    const applyFilters = async (values: MomentsFilterValues) => {
        const moments = await getMomentItems(values);

        setFilterValues(values);
        setMomentItems(moments);
    };

    const resetFilters = async () => {
        const moments = await getMomentItems();

        setFilterValues(emptyFilterValues);
        setMomentItems(moments);
    };

    return (
        <section className="fan-moments-section">
            <Container fluid>
                <Row>
                    <Col xs={12}>
                        <MomentsHeader />
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        <MomentsFilter
                            onFilterClick={() => setShowFilterDialog(true)}
                            onResetClick={() => {
                                resetFilters().catch(() => undefined);
                            }}
                        />
                        <MomentsFilterDialog
                            activeDates={filterOptions.activeDates}
                            bandOptions={filterOptions.bandOptions}
                            initialValues={filterValues}
                            locationOptions={filterOptions.locationOptions}
                            onApply={(values) => {
                                applyFilters(values).catch(() => undefined);
                            }}
                            show={showFilterDialog}
                            onHide={() => setShowFilterDialog(false)}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        <MomentsPhotoViewer items={momentItems} />
                    </Col>
                </Row>
            </Container>
        </section>
    );
}
