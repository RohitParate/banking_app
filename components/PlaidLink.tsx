import React, { useCallback, useEffect, useState } from 'react'
import { Button } from './ui/button'
import { PlaidLinkOnSuccess, PlaidLinkOptions, usePlaidLink } from 'react-plaid-link'
import { useRouter } from 'next/navigation'
import { createlinkToken, exchangePublicToken } from '@/lib/actions/users.actions'

const PlaidLink = ({ user, variant }: PlaidLinkProps) => {

    const router = useRouter();

    const [token, setToken] = useState('');

    useEffect(() => {
        const getlinkToken = async () => {
            const data = await createlinkToken(user);

            setToken(data?.linkToken);
        }

        getlinkToken();
    }, [user])

    const onSuccess = useCallback<PlaidLinkOnSuccess>(async (public_token: string) => {
        await exchangePublicToken({
            publicToken: public_token,
            user
        })
        router.push('/')
    }, [user]);

    const config: PlaidLinkOptions = {
        token,
        onSuccess
    }

    const { open, ready } = usePlaidLink(config);
    return (
        <>
            {variant === 'primary' ? <Button onClick={() => open()} disabled={!ready} className='plaidlink-primary'>
                Connect Bank
            </Button> : variant === 'ghost' ? <Button className=''>
                Connect Button
            </Button> : <Button>
                Connect Bank
            </Button>}
        </>
    )
}

export default PlaidLink