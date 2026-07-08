'use client';

import { FaChevronLeft, FaChevronRight, FaLongArrowAltLeft } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import type { FanMoment } from '@/types/moments';
import Modal from 'react-bootstrap/Modal';
import moment from 'moment';
import parse from 'html-react-parser';

type PhotoViewerItem = {
  alt: string;
  title: React.ReactNode;
  foregroundImage: string;
  foregroundHeight: number;
  foregroundWidth: number;
};

type PhotoViewerProps = {
  className?: string;
  moments?: FanMoment[];
};

const columnClassNames = [
  'fan-moments-photo-viewer__column fan-moments-photo-viewer__column--offset-medium',
  'fan-moments-photo-viewer__column',
  'fan-moments-photo-viewer__column fan-moments-photo-viewer__column--offset-large',
  'fan-moments-photo-viewer__column',
];

const getColumns = (items: PhotoViewerItem[]) => {
  const columns: PhotoViewerItem[][] = [[], [], [], []];

  items.forEach((item, index) => {
    columns[index % columns.length].push(item);
  });

  return columns;
};

const getMomentTitleText = (fm: FanMoment): React.ReactNode =>
  parse(
    [
      fm.key.sellerName,
      fm.key.eventVenue,
      fm.key.eventLocation,
      moment(fm.key.momentDate).format('MMMM D, YYYY'),
    ]
      .filter(Boolean)
      .join('<br />') || 'Fan moment',
  );

const getMomentAltText = (fm: FanMoment): string =>
  [
    fm.key.sellerName,
    fm.key.eventVenue,
    fm.key.eventLocation,
    moment(fm.key.momentDate).format('MMMM D, YYYY'),
  ]
    .filter(Boolean)
    .join('<br />') || 'Fan moment';

const getMomentImages = (fm: FanMoment): string[] =>
  fm.images && fm.images.length > 0
    ? fm.images
    : [fm.key.filename].filter((image): image is string => Boolean(image));

const getMomentPath = (fm: FanMoment, image: string): string => {
  const baseUrl = process.env.NEXT_PUBLIC_MOMENTS_URL ?? '';
  const normalizedBaseUrl = baseUrl.replace(/\/$/u, '');

  return `${normalizedBaseUrl}/${fm.key.momentDate}/${fm.key.eventId}/${image}`;
};

const getMomentKey = (fm: FanMoment): string =>
  [fm.key.eventId, fm.key.sellerId, fm.key.momentDate, fm.key.filename]
    .filter(Boolean)
    .join(':');

const getPhotoViewerItem = (fm: FanMoment, image: string): PhotoViewerItem => ({
  alt: getMomentAltText(fm),
  foregroundHeight: 416,
  foregroundImage: getMomentPath(fm, image),
  foregroundWidth: 416,
  title: getMomentTitleText(fm),
});

const getTileItems = (moments: FanMoment[]): PhotoViewerItem[] =>
  moments
    .map((fm) => {
      const [firstImage] = getMomentImages(fm);

      return firstImage ? getPhotoViewerItem(fm, firstImage) : undefined;
    })
    .filter((item): item is PhotoViewerItem => Boolean(item));

const getSelectedMomentItems = (fm: FanMoment): PhotoViewerItem[] =>
  getMomentImages(fm).map((image) => getPhotoViewerItem(fm, image));

export default function MomentsPhotoViewer({
  className,
  moments = [],
}: PhotoViewerProps) {
  const [selectedMomentKey, setSelectedMomentKey] = useState<string>();
  const [selectedImage, setSelectedImage] = useState<PhotoViewerItem>();
  const wrapperClassName = ['fan-moments-photo-viewer', className]
    .filter(Boolean)
    .join(' ');
  const selectedMoment = moments.find((fm) => getMomentKey(fm) === selectedMomentKey);
  const items = selectedMoment
    ? getSelectedMomentItems(selectedMoment)
    : getTileItems(moments);
  const columns = getColumns(items);
  const selectedImageIndex = selectedImage
    ? items.findIndex((item) => item.foregroundImage === selectedImage.foregroundImage)
    : -1;
  const displayedImage =
    selectedImageIndex >= 0 ? items[selectedImageIndex] : selectedImage;
  const hasPreviousImage = selectedImageIndex > 0;
  const hasNextImage = selectedImageIndex >= 0 && selectedImageIndex < items.length - 1;

  const showPreviousImage = () => {
    if (hasPreviousImage) {
      setSelectedImage(items[selectedImageIndex - 1]);
    }
  };

  const showNextImage = () => {
    if (hasNextImage) {
      setSelectedImage(items[selectedImageIndex + 1]);
    }
  };

  useEffect(() => {
    if (selectedMomentKey && !selectedMoment) {
      setSelectedMomentKey(undefined);
      setSelectedImage(undefined);
    }
  }, [selectedMoment, selectedMomentKey]);

  return (
    <>
      {selectedMoment ? (
        <div className="fan-moments-photo-viewer__selected-header">
          <h3 className="fan-moments-photo-viewer__selected-title">
            {getMomentTitleText(selectedMoment)}
          </h3>
          <div className="fan-moments-photo-viewer__toolbar">
            <button
              className="fan-moments-photo-viewer__back"
              type="button"
              onClick={() => setSelectedMomentKey(undefined)}
            >
              <FaLongArrowAltLeft
                className="fan-moments-photo-viewer__back-icon"
                aria-hidden="true"
              />
              Back
            </button>
          </div>
        </div>
      ) : undefined}
      <div className={wrapperClassName}>
        {columns.map((columnItems, columnIndex) => (
          <div
            key={`fan-moments-photo-viewer-column-${columnIndex}`}
            className={columnClassNames[columnIndex]}
          >
            {columnItems.map((item) => {
              const fm = moments.find((candidateMoment) => {
                const [firstImage] = getMomentImages(candidateMoment);

                return (
                  firstImage &&
                  getMomentPath(candidateMoment, firstImage) === item.foregroundImage
                );
              });

              if (selectedMoment) {
                return (
                  <button
                    key={item.foregroundImage}
                    className="fan-moments-photo-viewer__card fan-moments-photo-viewer__card-button"
                    type="button"
                    onClick={() => setSelectedImage(item)}
                  >
                    <img
                      className="fan-moments-photo-viewer__image fan-moments-photo-viewer__image--foreground"
                      src={item.foregroundImage}
                      alt={item.alt}
                      style={{
                        height: `${item.foregroundHeight}px`,
                        width: `${item.foregroundWidth}px`,
                      }}
                    />
                    <div
                      className="fan-moments-photo-viewer__card-overlay"
                      aria-hidden="true"
                    />
                  </button>
                );
              }

              if (fm) {
                return (
                  <button
                    key={item.foregroundImage}
                    className="fan-moments-photo-viewer__card fan-moments-photo-viewer__card-button"
                    type="button"
                    onClick={() => setSelectedMomentKey(getMomentKey(fm))}
                  >
                    <img
                      className="fan-moments-photo-viewer__image fan-moments-photo-viewer__image--foreground"
                      src={item.foregroundImage}
                      alt={item.alt?.toString() ?? ''}
                      style={{
                        height: `${item.foregroundHeight}px`,
                        width: `${item.foregroundWidth}px`,
                      }}
                    />
                    <div
                      className="fan-moments-photo-viewer__card-overlay"
                      aria-hidden="true"
                    >
                      {item.title}
                    </div>
                  </button>
                );
              }

              return (
                <article
                  key={item.foregroundImage}
                  className="fan-moments-photo-viewer__card"
                >
                  <img
                    className="fan-moments-photo-viewer__image fan-moments-photo-viewer__image--foreground"
                    src={item.foregroundImage}
                    alt=""
                    aria-hidden="true"
                    style={{
                      height: `${item.foregroundHeight}px`,
                      width: `${item.foregroundWidth}px`,
                    }}
                  />
                  <div
                    className="fan-moments-photo-viewer__card-overlay"
                    aria-hidden="true"
                  />
                </article>
              );
            })}
          </div>
        ))}
      </div>
      <Modal
        show={Boolean(displayedImage)}
        onHide={() => setSelectedImage(undefined)}
        centered
        dialogClassName="fan-moments-photo-viewer__image-dialog"
        contentClassName="fan-moments-photo-viewer__image-dialog-content"
      >
        <Modal.Body className="fan-moments-photo-viewer__image-dialog-body">
          {displayedImage ? (
            <div className="fan-moments-photo-viewer__image-dialog-frame">
              <button
                className="fan-moments-photo-viewer__image-dialog-close"
                type="button"
                aria-label="Close image"
                onClick={() => setSelectedImage(undefined)}
              >
                X
              </button>
              <button
                className="fan-moments-photo-viewer__image-dialog-nav fan-moments-photo-viewer__image-dialog-nav--previous"
                type="button"
                aria-label="Previous image"
                hidden={!hasPreviousImage}
                onClick={showPreviousImage}
              >
                <FaChevronLeft aria-hidden="true" />
              </button>
              <img
                className="fan-moments-photo-viewer__image-dialog-image"
                src={displayedImage.foregroundImage}
                alt={displayedImage.alt}
              />
              <button
                className="fan-moments-photo-viewer__image-dialog-nav fan-moments-photo-viewer__image-dialog-nav--next"
                type="button"
                aria-label="Next image"
                hidden={!hasNextImage}
                onClick={showNextImage}
              >
                <FaChevronRight aria-hidden="true" />
              </button>
            </div>
          ) : undefined}
        </Modal.Body>
      </Modal>
    </>
  );
}
