'use server';
import { revalidateTag } from 'next/cache';
import { api } from '@/helpers';
import { CONST_APIS, CONST_APIS_COMMON } from '@/constants';
import { BoEnumsCommon, BoUtilsCommon } from 'bodevops-be-common/dist';
import { IPhoto } from '@/interfaces/IModels.interface';
import {
  IBaseResponse,
  IGetManyItem,
  IQueries,
} from '@/interfaces/ICommon.interface';
import { IActionMultiDto } from '@/interfaces/IDTo.interface';

const TAG_NAME = {
  PHOTO: 'photo',
  PHOTOS: 'photos',
};

export async function createPhoto(payload: any) {
  const result = await api<IBaseResponse<IPhoto>>({
    url: `${CONST_APIS.VERSION_V1}/${CONST_APIS.FEATURES.COMMON.PHOTOS}`,
    options: {
      method: BoEnumsCommon.EMethodApi.POST,
      body: payload,
    },
  });
  revalidateTag(TAG_NAME.PHOTOS);
  return result;
}

export async function findAllPhotos(queries?: IQueries) {
  const defaultQueries: Partial<IQueries> = {
    ...queries,
  };

  const result = await api<IBaseResponse<IGetManyItem<IPhoto>>>({
    url: `${CONST_APIS.VERSION_V1}/${
      CONST_APIS.FEATURES.COMMON.PHOTOS
    }${BoUtilsCommon.UtilConvert.convertObjToQueriesString(
      defaultQueries as any
    )}`,
    options: {
      method: BoEnumsCommon.EMethodApi.GET,
      next: {
        tags: [TAG_NAME.PHOTOS],
      },
    },
  });
  return result;
}

export async function searchPhotos(queries?: IQueries) {
  const result = await api<IBaseResponse<IGetManyItem<IPhoto>>>({
    url: `${CONST_APIS.VERSION_V1}/${CONST_APIS.FEATURES.COMMON.PHOTOS}${
      CONST_APIS_COMMON.SEARCH
    }/${BoUtilsCommon.UtilConvert.convertObjToQueriesString(queries)}`,
    options: {
      method: BoEnumsCommon.EMethodApi.GET,
      next: {
        tags: [TAG_NAME.PHOTOS],
      },
    },
  });
  return result;
}

export async function updatePhoto(id: string, payload: any) {
  const result = await api<IBaseResponse<IPhoto>>({
    url: `${CONST_APIS.VERSION_V1}/${CONST_APIS.FEATURES.COMMON.PHOTOS}/update/${id}`,
    options: {
      method: BoEnumsCommon.EMethodApi.PATCH,
      body: payload,
    },
  });
  revalidateTag(TAG_NAME.PHOTOS);
  return result;
}

export async function restoreMulti(payload: IActionMultiDto) {
  const result = await api<IBaseResponse<IPhoto>>({
    url: `${CONST_APIS.VERSION_V1}/${CONST_APIS.FEATURES.COMMON.PHOTOS}/${CONST_APIS_COMMON.RESTORE_MULTI}`,
    options: {
      method: BoEnumsCommon.EMethodApi.PATCH,
      body: JSON.stringify(payload),
    },
  });
  revalidateTag(TAG_NAME.PHOTOS);
  return result;
}

export async function softRemoveMulti(payload: IActionMultiDto) {
  const result = await api<IBaseResponse<IPhoto>>({
    url: `${CONST_APIS.VERSION_V1}/${CONST_APIS.FEATURES.COMMON.PHOTOS}/${CONST_APIS_COMMON.SOFT_DELETE_MULTI}`,
    options: {
      method: BoEnumsCommon.EMethodApi.DELETE,
      body: JSON.stringify(payload),
    },
  });
  revalidateTag(TAG_NAME.PHOTOS);
  return result;
}

export async function removeMulti(payload: IActionMultiDto) {
  const result = await api<IBaseResponse<IPhoto>>({
    url: `${CONST_APIS.VERSION_V1}/${CONST_APIS.FEATURES.COMMON.PHOTOS}/${CONST_APIS_COMMON.DELETE_MULTI}`,
    options: {
      method: BoEnumsCommon.EMethodApi.DELETE,
      body: JSON.stringify(payload),
    },
  });
  revalidateTag(TAG_NAME.PHOTOS);
  return result;
}
