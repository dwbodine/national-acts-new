'use client';

import { ArtistBoxProps } from '@/types/props';

export const useGetDisplayAddress = () => {
  const getDisplayAddress = (props: ArtistBoxProps): string => {
    let address = '';
    if (props.Address) {
      address = props.Address;
    }
    if (props.City) {
      if (address.length > 0) {
        address += '<br />';
      }
      address += props.City;
      if (props.State) {
        address += `, ${props.State}`;
        if (props.Zip) {
          address += ` ${props.Zip}`;
          if (props.Country) {
            address += `<br /> ${props.Country}`;
            if (props.Phone) {
              address += `<br /> ${props.Phone}`;
              if (props.Email) {
                address += `<br /> ${props.Email}`;
              }
            } else if (props.Email) {
              address += `<br /> ${props.Email}`;
            }
          } else if (props.Phone) {
            address += `<br /> ${props.Phone}`;
            if (props.Email) {
              address += `<br /> ${props.Email}`;
            }
          } else if (props.Email) {
            address += `<br /> ${props.Email}`;
          }
        }
      } else if (props.Country) {
        address += `, ${props.Country}`;
        if (props.Zip) {
          address += ` ${props.Zip}`;
        }
      }
    }
    return address.length > 0 ? address : '';
  };
  return { getDisplayAddress };
};
