"use client";

import { Col, Container, Row } from "react-bootstrap";
import type { FanMoment, MomentsFilterOption } from "@/types/moments";
import MomentsFilterDialog, { type MomentsFilterValues } from "./Moments/MomentsFilterDialog";
import { useCallback, useEffect, useState } from "react";
import MomentsFilter from "./Moments/MomentsFilter";
import MomentsHeader from "./Moments/MomentsHeader";
import MomentsPhotoViewer from "./Moments/MomentsPhotoViewer";
import { RingLoader } from 'react-spinners';
import { useRouter } from "next/navigation";

const emptyFilterValues: MomentsFilterValues = {
    location: '',
};

type MomentRequestValues = MomentsFilterValues & {
    sellerId?: string;
};

type MomentFilterOptions = {
    activeDates: string[];
    locationOptions: MomentsFilterOption[];
};

const emptyFilterOptions: MomentFilterOptions = {
    activeDates: [],
    locationOptions: [],
};
const momentResponseCollectionKeys = ['moments', 'data', 'items', 'results'];
const momentImageCollectionKeys = ['images', 'Images'];

const getMomentFilterUrl = (values?: MomentRequestValues): string => {
    const searchParams = new URLSearchParams();

    if (values?.sellerId) {
        searchParams.set('sellerId', values.sellerId);
    }

    if (values?.location) {
        searchParams.set('eventId', values.location);
    }

    const queryString = searchParams.toString();

    return queryString ? `/api/moments/filter?${queryString}` : '/api/moments/filter';
};

const normalizeDate = (dateValue?: string): string | undefined => {
    const trimmedDateValue = dateValue?.trim();

    if (!trimmedDateValue) {
        return undefined;
    }

    if (/^\d{4}-\d{2}-\d{2}/u.test(trimmedDateValue)) {
        return trimmedDateValue.slice(0, 10);
    }

    const parsedDate = new Date(trimmedDateValue);

    if (Number.isNaN(parsedDate.getTime())) {
        return undefined;
    }

    const year = parsedDate.getFullYear();
    const month = `${parsedDate.getMonth() + 1}`.padStart(2, '0');
    const day = `${parsedDate.getDate()}`.padStart(2, '0');

    return `${year}-${month}-${day}`;
};

const getSortedUniqueOptions = (
    options: Array<MomentsFilterOption | undefined>,
): MomentsFilterOption[] => {
    const optionsByValue = new Map<string, MomentsFilterOption>();

    options.forEach((option) => {
        if (option && !optionsByValue.has(option.value)) {
            optionsByValue.set(option.value, option);
        }
    });

    return [...optionsByValue.values()].sort((firstOption, secondOption) =>
        firstOption.label.localeCompare(secondOption.label),
    );
};

const getLocationOptions = (moments: FanMoment[]): MomentsFilterOption[] =>
    getSortedUniqueOptions(
        moments.map((moment) => {
            const eventId = moment.key.eventId?.trim();
            const eventVenue = moment.key.eventVenue?.trim();
            const eventLocation = moment.key.eventLocation?.trim();
            const label = [eventVenue, eventLocation].filter(Boolean).join(' - ');

            if (!eventId || !label) {
                return undefined;
            }

            return {
                label,
                value: eventId,
            };
        }),
    );

const getFilterOptionsFromMoments = (moments: FanMoment[]): MomentFilterOptions => ({
    activeDates: [
        ...new Set(
            moments
                .map((moment) => normalizeDate(moment.key.momentDate))
                .filter((date): date is string => Boolean(date)),
        ),
    ].sort(),
    locationOptions: getLocationOptions(moments),
});

const isRecord = (value: unknown): value is Record<string, unknown> =>
    Boolean(value) && typeof value === 'object';

const getStringValue = (
    value: Record<string, unknown>,
    propertyNames: string[],
): string | undefined => {
    const propertyValue = propertyNames
        .map((propertyName) => value[propertyName])
        .find(
            (candidateValue) =>
                (typeof candidateValue === 'string' && candidateValue.trim().length > 0) ||
                typeof candidateValue === 'number',
        );

    return propertyValue === undefined ? undefined : `${propertyValue}`.trim();
};

const getMomentImages = (value: Record<string, unknown>): string[] | undefined => {
    const imageItems = momentImageCollectionKeys
        .map((collectionKey) => value[collectionKey])
        .find(Array.isArray);

    if (imageItems) {
        return imageItems
            .filter(
                (imageItem): imageItem is string =>
                    typeof imageItem === 'string' && imageItem.trim().length > 0,
            )
            .map((imageItem) => imageItem.trim());
    }

    const filename = getStringValue(value, ['filename', 'Filename', 'fileName', 'FileName']);

    return filename ? [filename] : undefined;
};

const normalizeFanMoment = (value: unknown): FanMoment | undefined => {
    if (!isRecord(value)) {
        return undefined;
    }

    const sourceKey = value.key ?? value.Key;
    const keySource = isRecord(sourceKey) ? sourceKey : value;
    const key = {
        eventId: getStringValue(keySource, ['eventId', 'EventId', 'eventID', 'EventID']),
        eventLocation: getStringValue(keySource, ['eventLocation', 'EventLocation']),
        eventTitle: getStringValue(keySource, ['eventTitle', 'EventTitle']),
        eventVenue: getStringValue(keySource, ['eventVenue', 'EventVenue']),
        filename: getStringValue(keySource, ['filename', 'Filename', 'fileName', 'FileName']),
        momentDate: getStringValue(keySource, ['momentDate', 'MomentDate']),
        sellerId: getStringValue(keySource, ['sellerId', 'SellerId', 'sellerID', 'SellerID']),
        sellerName: getStringValue(keySource, ['sellerName', 'SellerName']),
    };
    const images = getMomentImages(value) ?? getMomentImages(keySource);

    if (!key.eventId || !key.momentDate || (!key.filename && (!images || images.length === 0))) {
        return undefined;
    }

    return {
        images,
        key,
    };
};

const getMomentResponseItems = (responseData: unknown): FanMoment[] => {
    if (Array.isArray(responseData)) {
        return responseData
            .map(normalizeFanMoment)
            .filter((moment): moment is FanMoment => Boolean(moment));
    }

    if (!isRecord(responseData)) {
        return [];
    }

    const momentItems = momentResponseCollectionKeys
        .map((collectionKey) => responseData[collectionKey])
        .find(Array.isArray);

    return momentItems
        ? momentItems
              .map(normalizeFanMoment)
              .filter((moment): moment is FanMoment => Boolean(moment))
        : [];
};

const getMomentItems = async (values?: MomentRequestValues): Promise<FanMoment[]> => {
    const response = await fetch(getMomentFilterUrl(values), {
        cache: 'no-store',
    });

    if (!response.ok) {
        return [];
    }

    const fanMoments = getMomentResponseItems(await response.json());

    return fanMoments;
};

export default function FanMoments() {
    const router = useRouter();
    const [filterOptions, setFilterOptions] = useState<MomentFilterOptions>(emptyFilterOptions);
    const [filterValues, setFilterValues] = useState<MomentsFilterValues>(emptyFilterValues);
    const [moments, setMoments] = useState<FanMoment[]>([]);
    const [selectedSellerId, setSelectedSellerId] = useState('');
    const [photoViewerKey, setPhotoViewerKey] = useState(0);
    const [isLoadingMoments, setIsLoadingMoments] = useState(false);
    const [showFilterDialog, setShowFilterDialog] = useState(false);

    const selectSeller = useCallback(async (sellerId: string) => {
        setSelectedSellerId(sellerId);
        setFilterValues(emptyFilterValues);
        setFilterOptions(emptyFilterOptions);
        setMoments([]);
        setShowFilterDialog(false);
        setIsLoadingMoments(true);

        try {
            const loadedMoments = await getMomentItems({ ...emptyFilterValues, sellerId });

            setFilterOptions(getFilterOptionsFromMoments(loadedMoments));
            setMoments(loadedMoments);
            setPhotoViewerKey((currentKey) => currentKey + 1);
        } finally {
            setIsLoadingMoments(false);
        }
    }, []);

    useEffect(() => {
        const sellerId = new URLSearchParams(window.location.search).get('sellerId')?.trim();

        if (sellerId) {
            selectSeller(sellerId).catch(() => undefined);
        }
    }, [selectSeller]);

    const applyFilters = async (values: MomentsFilterValues) => {
        if (!selectedSellerId) {
            return;
        }

        setIsLoadingMoments(true);

        try {
            const loadedMoments = await getMomentItems({
                ...values,
                sellerId: selectedSellerId,
            });

            setFilterValues(values);
            setMoments(loadedMoments);
            setPhotoViewerKey((currentKey) => currentKey + 1);
        } finally {
            setIsLoadingMoments(false);
        }
    };

    const resetFilters = () => {
        setSelectedSellerId('');
        setFilterValues(emptyFilterValues);
        setFilterOptions(emptyFilterOptions);
        setMoments([]);
        setShowFilterDialog(false);
        setPhotoViewerKey((currentKey) => currentKey + 1);
        router.replace('/moments');
    };

    const hasSelectedSeller = Boolean(selectedSellerId);
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
                            onBandSelect={(sellerId) => {
                                selectSeller(sellerId).catch(() => undefined);
                            }}
                            onFilterClick={() => setShowFilterDialog(true)}
                            onResetClick={() => {
                                resetFilters();
                            }}
                            selectedBand={selectedSellerId}
                        />
                        <MomentsFilterDialog
                            activeDates={filterOptions.activeDates}
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
                    <Col xs={12} hidden={!isLoadingMoments || !hasSelectedSeller} className="fan-moments-spinner">
                        <RingLoader size={150} color="#d12610" />
                    </Col>
                    {hasSelectedSeller && !isLoadingMoments ? (
                        <Col xs={12}>
                            <MomentsPhotoViewer key={photoViewerKey} moments={moments} />
                        </Col>
                    ) : null}
                </Row>
            </Container>
        </section>
    );
}
