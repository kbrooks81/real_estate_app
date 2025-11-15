import { Account, Avatars, Client, OAuthProvider } from 'react-native-appwrite';
import * as Linking from 'expo-linking'

export const config = {
    platform: 'com.bd.brooksstate',
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
    projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
}

export const client = new Client();

client
    .setEndpoint(config.endpoint!)
    .setProject(config.projectId!)
    .setPlatform(config.platform!)

export const avatar = new Avatars(client);
export const account = new Account(client);

export async function login() {
    try {
        const redirectUri = Linking.createURL(path: '/');

        const response = await account.createOAuth2Token(OAuthProvider.Google, redirectUri);

        if(!response) throw new Error(message: 'Failed to login');

        const browserResult = await openAuthSessionAsync(
            response.toString(),
            redirectUri
        )

        if(browserResult.type != 'success') throw new Error(message: 'Failed to login');

        const url = new URL(browserResult.url);

        const secret = url.searchParams.get('secret')?.toString();
        const userId = url.searchParams.get('userId')?.toString();

        if(!secret || !userId) throw new Error(message: 'Failed to login');

        const session = await account.createSession(userId, secret);

        if(!session) throw new Error(message: 'Failed to create a session');

        return true
    } catch (e) {
        console.error(e);
        return false;
    }
}

export async function logout() {
    try {
        await account.deleteSession(sessionId: 'current');
        return true;
    } catch(e) {
        console.error(e);
        return false;
    } 
}

export async function getUser() {
    try {
        const response = await account.get();

        if(response.$id) {
            const userAvatar = avatar.getInitials(response.name);

            return {
                ...response,
                avatar: userAvatar.toString();
            }
        }
    } catch(e) {
        console.error(e);
        return null;
    } 
}