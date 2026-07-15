"use client";

import { FaInfoCircle, FaMapMarkerAlt } from "react-icons/fa";
import { EventRowProps } from "@/types/props";
import { MouseEvent } from "react";
import { SellerType } from "@/types/public";
import moment from "moment";

const getEventThumbnail = (thumbnail?: string, externalThumbnail?: string): string => {
  const image = externalThumbnail || thumbnail;

  if (image && image.length > 4) {
    return image.startsWith("http") ? image : `${process.env.NEXT_PUBLIC_THUMBNAILS_URL}${image}`;
  }

  return "/images/logo_icon.jpg";
};

const getVenueAddress = (eventRow: EventRowProps["Event"]): string => {
  const venue = eventRow?.venue;

  return [
    venue?.name,
    venue?.address1,
    [venue?.city, venue?.state, venue?.postalCode].filter(Boolean).join(" "),
    venue?.country?.country,
  ]
    .filter(Boolean)
    .join(" ");
};

export default function EventRowV2(props: EventRowProps) {
  const eventRow = props.Event;
  const onOpenUrl = props.OpenUrl;
  const isVenue = props.SellerType === SellerType.Venue;

  const openUrl = (
    e: MouseEvent<HTMLAnchorElement>,
    url: string | undefined,
    isDisabled: boolean,
  ) => {
    e.preventDefault();
    if (!url || isDisabled) {
      e.stopPropagation();
      return;
    }
    if (onOpenUrl) {
      onOpenUrl(url);
    }
  };

  const date = eventRow ? moment(eventRow.eventDate) : undefined;
  const eventDate = date ? date.format("M/D/YYYY") : "";
  let eventTime = "";
  if (eventRow?.eventTime) {
    eventTime = moment(eventRow.eventTime).format("h:mm A");
    if (eventRow.venue?.timezone) {
      eventTime = `${eventTime} ${eventRow.venue.timezone}`;
    }
  }

  let title = eventRow?.title ?? "";
  const ticketUrl = eventRow?.externalUrl?.trim() ?? "";
  let vipUrl = "";
  if (eventRow?.externalVipLink?.trim()) {
    vipUrl = eventRow.externalVipLink;
  } else if (eventRow?.ticketSocketUrl?.trim()) {
    vipUrl = eventRow.ticketSocketUrl;
  }

  const ticketDisabled = eventRow?.disableLinkButton ?? false;
  let vipDisabled = eventRow?.disableVipLinkButton ?? false;
  const ticketText = eventRow?.disableLinkReason || "Tickets";
  let vipText = isVenue ? "Tickets" : "VIP";

  if (eventRow?.isSoldOut) {
    vipDisabled = true;
    title = `${title} - SOLD OUT`;
    vipText = "SOLD OUT";
  } else if (!isVenue && eventRow?.disableVipLinkReason) {
    vipText = eventRow.disableVipLinkReason;
  }

  const ticketUnavailable = !ticketUrl || ticketDisabled;
  const vipUnavailable = !vipUrl || vipDisabled;
  const noteText = eventRow?.eventNote;
  const thumbnail = getEventThumbnail(eventRow?.thumbnail, eventRow?.externalThumbnail);
  const venueAddress = getVenueAddress(eventRow);

  return (
    <article className="event-row-v2" hidden={!eventRow}>
      <img className="event-row-v2__poster" src={thumbnail} alt={title} />

      <div className="event-row-v2__body">
        <div className="event-row-v2__details">
          <h3 className="event-row-v2__title">{title}</h3>
          <div className="event-row-v2__meta">
            <span>{eventDate}</span>
            <span className="event-row-v2__dot" aria-hidden="true" hidden={!eventTime} />
            <span>{eventTime}</span>
          </div>

          <div className="event-row-v2__address">
            <FaMapMarkerAlt aria-hidden="true" className="event-row-v2__address-icon" />
            <p>{venueAddress}</p>
          </div>

          {noteText && (
            <div className="event-row-v2__note">
              <FaInfoCircle aria-hidden="true" className="event-row-v2__note-icon" />
              <span>{noteText}</span>
            </div>
          )}
        </div>

        <div className="event-row-v2__actions">
          {!isVenue && (
            <a
              className={`event-row-v2__button event-row-v2__button--tickets${ticketUnavailable ? " event-row-v2__button--disabled" : ""}`}
              href={ticketUrl || "#"}
              onClick={(e) => openUrl(e, ticketUrl, ticketDisabled)}
            >
              {ticketText}
            </a>
          )}
          <a
            className={`event-row-v2__button event-row-v2__button--vip${vipUnavailable ? " event-row-v2__button--disabled" : ""}`}
            href={vipUrl || "#"}
            onClick={(e) => openUrl(e, vipUrl, vipDisabled)}
          >
            {vipText}
          </a>
        </div>
      </div>
    </article>
  );
}
