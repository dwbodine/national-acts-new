"use client";

import { Col, Container, Row } from "react-bootstrap";
import type { FanMoment, MomentsFilterOptionsResponse } from "@/types/moments";
import MomentsFilterDialog, { type MomentsFilterValues } from "./MomentsFilterDialog";
import { useEffect, useState } from "react";
import MomentsFilter from "./MomentsFilter";
import MomentsHeader from "./MomentsHeader";
import MomentsPhotoViewer from "./MomentsPhotoViewer";
import { RingLoader } from 'react-spinners';

const latestMomentCount = 8;

const emptyFilterValues: MomentsFilterValues = {
    band: '',
    date: '',
    location: '',
};

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

const getFilterOptions = async (): Promise<MomentsFilterOptionsResponse | undefined> => {
    const response = await fetch('/api/moments/filter-options');

    if (!response.ok) {
        return undefined;
    }

    return (await response.json()) as MomentsFilterOptionsResponse;
};

const getMomentItems = async (values?: MomentsFilterValues): Promise<FanMoment[]> => {
    const response = await fetch(getMomentFilterUrl(values));

    if (!response.ok) {
        return [];
    }

    const fanMoments = (await response.json()) as FanMoment[];

    return hasMomentFilters(values) ? fanMoments : fanMoments.slice(0, latestMomentCount);
};

export default function FanMoments() {
    const [filterOptions, setFilterOptions] = useState<MomentsFilterOptionsResponse>({
        activeDates: [],
        bandOptions: [],
        locationOptions: [],
    });
    const [filterValues, setFilterValues] = useState<MomentsFilterValues>(emptyFilterValues);
    const [moments, setMoments] = useState<FanMoment[]>([]);
    const [photoViewerKey, setPhotoViewerKey] = useState(0);
    const [isLoadingMoments, setIsLoadingMoments] = useState(true);
    const [showFilterDialog, setShowFilterDialog] = useState(false);

    useEffect(() => {
        let shouldUpdate = true;

        const loadInitialMomentData = async () => {
            setIsLoadingMoments(true);

            try {
                const [loadedFilterOptions, loadedMoments] = await Promise.all([
                    getFilterOptions(),
                    getMomentItems(),
                ]);

                if (shouldUpdate) {
                    if (loadedFilterOptions) {
                        setFilterOptions(loadedFilterOptions);
                    }

                    setMoments(loadedMoments);
                }
            } finally {
                if (shouldUpdate) {
                    setIsLoadingMoments(false);
                }
            }
        };

        loadInitialMomentData().catch(() => undefined);

        return () => {
            shouldUpdate = false;
        };
    }, []);

    const applyFilters = async (values: MomentsFilterValues) => {
        setIsLoadingMoments(true);

        try {
            const loadedMoments = await getMomentItems(values);

            setFilterValues(values);
            setMoments(loadedMoments);
            setPhotoViewerKey((currentKey) => currentKey + 1);
        } finally {
            setIsLoadingMoments(false);
        }
    };

    const resetFilters = async () => {
        setIsLoadingMoments(true);

        try {
            const [loadedFilterOptions, loadedMoments] = await Promise.all([
                getFilterOptions(),
                getMomentItems(),
            ]);

            setFilterValues(emptyFilterValues);
            if (loadedFilterOptions) {
                setFilterOptions(loadedFilterOptions);
            }

            setMoments(loadedMoments);
            setPhotoViewerKey((currentKey) => currentKey + 1);
        } finally {
            setIsLoadingMoments(false);
        }
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
                            disabled={isLoadingMoments}
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
                    <Col xs={12} hidden={!isLoadingMoments} className="fan-moments-spinner">
                        <RingLoader size={150} color="#d12610" />
                    </Col>
                    <Col xs={12} hidden={isLoadingMoments}>
                        <MomentsPhotoViewer key={photoViewerKey} moments={moments} />
                    </Col>
                </Row>
            </Container>
        </section>
    );
}
