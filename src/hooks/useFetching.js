import {useState} from "react";

export const useFetching = (callback) => {
    const [isLoading, setIsLoaading] = useState(false)
    const [error, setError] = useState("")

    const fetching = async () => {
        try {
            setIsLoaading(true)
            await callback()

        } catch (error) {
            setError(error.message)

        } finally {
            setIsLoaading(false)
        }

    }
    return [fetching, isLoading, error]

}