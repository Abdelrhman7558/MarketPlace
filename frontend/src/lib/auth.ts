
// Mock Auth for Deployment
export const authOptions = {
    providers: [],
    callbacks: {
        async session({ session, token }: any) {
            // Force strict Manager Role for 7bd02025@gmail.com
            if (session?.user?.email === '7bd02025@gmail.com') {
                session.user.role = 'MANAGER';
            } else {
                session.user.role = 'BUYER';
            }
            return session;
        }
    }
};
