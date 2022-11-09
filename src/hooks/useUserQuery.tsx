//hook to get user data
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useAccessTokenQuery } from "./useAccessTokenQuery";

export interface Localized {
  en_US: string;
}

export interface PreferredLocale {
  country: string;
  language: string;
}

export interface FirstName {
  localized: Localized;
  preferredLocale: PreferredLocale;
}

export interface Localized2 {
  en_US: string;
}

export interface PreferredLocale2 {
  country: string;
  language: string;
}

export interface LastName {
  localized: Localized2;
  preferredLocale: PreferredLocale2;
}

export interface UserObject {
  localizedLastName: string;
  profilePicture: ProfilePictureObject;
  firstName: FirstName;
  lastName: LastName;
  id: string;
  localizedFirstName: string;
}

export interface Paging {
  count: number;
  start: number;
  links: any[];
}

export interface RawCodecSpec {
  name: string;
  type: string;
}

export interface DisplaySize {
  width: number;
  uom: string;
  height: number;
}

export interface StorageSize {
  width: number;
  height: number;
}

export interface StorageAspectRatio {
  widthAspect: number;
  heightAspect: number;
  formatted: string;
}

export interface DisplayAspectRatio {
  widthAspect: number;
  heightAspect: number;
  formatted: string;
}

export interface ComLinkedinDigitalmediaMediaartifactStillImage {
  mediaType: string;
  rawCodecSpec: RawCodecSpec;
  displaySize: DisplaySize;
  storageSize: StorageSize;
  storageAspectRatio: StorageAspectRatio;
  displayAspectRatio: DisplayAspectRatio;
}

export interface Data {
  "com.linkedin.digitalmedia.mediaartifact.StillImage": ComLinkedinDigitalmediaMediaartifactStillImage;
}

export interface Identifier {
  identifier: string;
  index: number;
  mediaType: string;
  file: string;
  identifierType: string;
  identifierExpiresInSeconds: number;
}

export interface Element {
  artifact: string;
  authorizationMethod: string;
  data: Data;
  identifiers: Identifier[];
}

export interface DisplayImage {
  paging: Paging;
  elements: Element[];
}

export interface ProfilePictureObject {
  displayImage: string;
  "displayImage~": DisplayImage;
}

export const useUserQuery = () => {
  const { accessToken } = useAccessTokenQuery(undefined);
  const queryClient = useQueryClient();
  const userQuery = useQuery(
    ["user"],
    async () => {
      //
      const { data }: { data: UserObject } = await axios.get(
        `http://localhost:5000/api/users/linkedin/user/${accessToken?.access_token}`
      );
      return data;
    },
    {
      enabled: !!accessToken?.access_token,
      onSuccess: (data) => {
        queryClient.setQueryData(["user"], data);
      },
    }
  );
  const addUserQuery = useQuery(
    ["addUser"],
    async () => {
      const { data } = await axios.post(
        `http://localhost:5000/api/users/linkedin/user`,
        {
          id: userQuery.data?.id,
          accessToken: accessToken?.access_token,
        }
      );
      return data;
    },
    {
      enabled: !!accessToken?.access_token && !!userQuery.data?.id,
      onSuccess: (data) => {
        queryClient.setQueryData(["addUser"], data);
      },
    }
  );

  return { userQuery, user: userQuery.data, addUserQuery };
};
