"use client"
import { AuthClientPlugin } from "@blitzjs/auth"
import { setupBlitzClient } from "@blitzjs/next"
import { BlitzRpcPlugin, getQueryClient } from "@blitzjs/rpc"
import { authConfig } from "./blitz-auth-config"

export const { withBlitz, BlitzProvider } = setupBlitzClient({
  plugins: [
    AuthClientPlugin(authConfig),
    BlitzRpcPlugin({
      reactQueryOptions: {
        queries: {
          retry: 2,
        },
        mutations: {
          // This 2 lines are for refetching the data after any mutation
          onSuccess: async () => {
            const queryClient = getQueryClient()
            await queryClient.invalidateQueries()
          }
        }
      },
    })
  ],
})
