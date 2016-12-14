/**
 * Created by charles on 14/12/16.
 */

//clean the string of headers.link :  rel="next", <url> => url
export function cleanLink(dirtyLink) {
    return dirtyLink.substring(dirtyLink.search('<') + 1, dirtyLink.search('>'));
}