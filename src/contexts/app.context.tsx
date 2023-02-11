import React, { createContext, useState } from 'react';

import { User } from 'src/types/user.type';
import { ExtendedPurchase } from 'src/types/purchase.type';
import { getAccessTokenFromLS, getProfileFromLS } from 'src/utils/auth';
interface AppContextInterface {
    isAuthenticated: boolean;
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
    profile: User | null;
    setProfile: React.Dispatch<React.SetStateAction<User | null>>;
    extendedPurchases: ExtendedPurchase[];
    setExtendedPurchases: React.Dispatch<React.SetStateAction<ExtendedPurchase[]>>;
    reset: () => void;
}

export const getInitialAppContext: () => AppContextInterface = () => ({
    isAuthenticated: Boolean(getAccessTokenFromLS()),
    setIsAuthenticated: () => null,
    profile: getProfileFromLS(),
    setProfile: () => null,
    extendedPurchases: [],
    setExtendedPurchases: () => null,
    reset: () => null
});

const initialAppContext = getInitialAppContext();

export const AppContext = createContext<AppContextInterface>(initialAppContext);

export const AppProvider = ({
    children,
    defaultValue = initialAppContext
}: {
    children: React.ReactNode;
    defaultValue?: AppContextInterface;
}) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(defaultValue.isAuthenticated);

    const [profile, setProfile] = useState<User | null>(defaultValue.profile);

    const [extendedPurchases, setExtendedPurchases] = useState<ExtendedPurchase[]>(defaultValue.extendedPurchases);

    const reset = () => {
        setIsAuthenticated(false);
        setExtendedPurchases([]);
        setProfile(null);
    };

    return (
        <AppContext.Provider
            value={{
                isAuthenticated,
                setIsAuthenticated,
                profile,
                setProfile,
                extendedPurchases,
                setExtendedPurchases,
                reset
            }}
        >
            {children}
        </AppContext.Provider>
    );
};
