import {
    BaseQueryFn,
    FetchArgs,
    fetchBaseQuery,
    FetchBaseQueryError,
    retry
} from "@reduxjs/toolkit/dist/query";
import { Mutex } from 'async-mutex';
import { logout, setAuthTokenToRequest } from "../features/auth/auth.store";
import { getEndpointUrl } from "../shared/utils";

const mutex = new Mutex()

export const buildBaseQueryWithReauthFunc = (endpointRoute: string): BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> => async (args, api, extraOptions) => {
    const baseQuery = retry(
        fetchBaseQuery({
            baseUrl: getEndpointUrl(endpointRoute),
            prepareHeaders: setAuthTokenToRequest,
        }),
        { maxRetries: 2 }
    );

    // wait until the mutex is available without locking it
    await mutex.waitForUnlock();

    let result = await baseQuery(args, api, extraOptions);

    if (result.error && [401, 422].includes(result.error.status as unknown as number)) {
        // checking whether the mutex is locked
        if (!mutex.isLocked()) {
            const release = await mutex.acquire();

            api.dispatch(logout());

            release();

            // @FIXME: later need to activate automaticl refetch access token

            // try {
            // 	const refreshResult = await baseQuery(
            // 		'/refreshToken',
            // 		api,
            // 		extraOptions
            // 	)
            // 	if (refreshResult.data) {
            // 		api.dispatch(tokenReceived(refreshResult.data))
            // 		// retry the initial query
            // 		result = await baseQuery(args, api, extraOptions)
            // 	} else {
            // 		api.dispatch(loggedOut())
            // 	}
            // } finally {
            // 	// release must be called once the mutex should be released again.
            // 	release()
            // }
        } else {
            // wait until the mutex is available without locking it
            await mutex.waitForUnlock()
            result = await baseQuery(args, api, extraOptions);
        }
    }
    return result
};