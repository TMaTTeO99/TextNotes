/* tslint:disable */
/* eslint-disable */
/**
 * OpenApi manifest for my TextNoteClient
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import * as runtime from '../runtime';
import type {
  AddNotePost400Response,
  AddNotePostRequest,
  AllGet200ResponseInner,
  UpdateNotePutRequest,
} from '../models/index';
import {
    AddNotePost400ResponseFromJSON,
    AddNotePost400ResponseToJSON,
    AddNotePostRequestFromJSON,
    AddNotePostRequestToJSON,
    AllGet200ResponseInnerFromJSON,
    AllGet200ResponseInnerToJSON,
    UpdateNotePutRequestFromJSON,
    UpdateNotePutRequestToJSON,
} from '../models/index';

export interface AddNotePostOperationRequest {
    addNotePostRequest: AddNotePostRequest;
}

export interface IdDeleteRequest {
    id: string;
}

export interface IdGetRequest {
    id: string;
}

export interface UpdateNotePutOperationRequest {
    updateNotePutRequest: UpdateNotePutRequest;
}

/**
 * 
 */
export class DefaultApi extends runtime.BaseAPI {

    /**
     * Add one note in list of notes
     */
    async addNotePostRaw(requestParameters: AddNotePostOperationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<AllGet200ResponseInner>> {
        if (requestParameters['addNotePostRequest'] == null) {
            throw new runtime.RequiredError(
                'addNotePostRequest',
                'Required parameter "addNotePostRequest" was null or undefined when calling addNotePost().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/addNote`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: AddNotePostRequestToJSON(requestParameters['addNotePostRequest']),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => AllGet200ResponseInnerFromJSON(jsonValue));
    }

    /**
     * Add one note in list of notes
     */
    async addNotePost(requestParameters: AddNotePostOperationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<AllGet200ResponseInner> {
        const response = await this.addNotePostRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Return all notes
     */
    async allGetRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<AllGet200ResponseInner>>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/all`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(AllGet200ResponseInnerFromJSON));
    }

    /**
     * Return all notes
     */
    async allGet(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<AllGet200ResponseInner>> {
        const response = await this.allGetRaw(initOverrides);
        return await response.value();
    }

    /**
     * Delete data from his unique id
     */
    async idDeleteRaw(requestParameters: IdDeleteRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<AllGet200ResponseInner>> {
        if (requestParameters['id'] == null) {
            throw new runtime.RequiredError(
                'id',
                'Required parameter "id" was null or undefined when calling idDelete().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters['id']))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => AllGet200ResponseInnerFromJSON(jsonValue));
    }

    /**
     * Delete data from his unique id
     */
    async idDelete(requestParameters: IdDeleteRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<AllGet200ResponseInner> {
        const response = await this.idDeleteRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Rtrieve note\'s data from his unique id
     */
    async idGetRaw(requestParameters: IdGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<AllGet200ResponseInner>> {
        if (requestParameters['id'] == null) {
            throw new runtime.RequiredError(
                'id',
                'Required parameter "id" was null or undefined when calling idGet().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters['id']))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => AllGet200ResponseInnerFromJSON(jsonValue));
    }

    /**
     * Rtrieve note\'s data from his unique id
     */
    async idGet(requestParameters: IdGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<AllGet200ResponseInner> {
        const response = await this.idGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Update note\'s data from his unique id
     */
    async updateNotePutRaw(requestParameters: UpdateNotePutOperationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<AllGet200ResponseInner>> {
        if (requestParameters['updateNotePutRequest'] == null) {
            throw new runtime.RequiredError(
                'updateNotePutRequest',
                'Required parameter "updateNotePutRequest" was null or undefined when calling updateNotePut().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/updateNote`,
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: UpdateNotePutRequestToJSON(requestParameters['updateNotePutRequest']),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => AllGet200ResponseInnerFromJSON(jsonValue));
    }

    /**
     * Update note\'s data from his unique id
     */
    async updateNotePut(requestParameters: UpdateNotePutOperationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<AllGet200ResponseInner> {
        const response = await this.updateNotePutRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
