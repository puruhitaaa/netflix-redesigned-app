import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import useAuth from '../../hooks/useAuth'

type Inputs = {
  email: string
  password: string
}

const Login = () => {
  const [login, setLogin] = useState(false)
  const { signIn, signUp } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
    if (login) {
      await signIn(email, password)
    } else {
      await signUp(email, password)
    }
  }

  return (
    <div className="relative flex h-screen w-screen flex-col bg-black md:items-center md:justify-center md:bg-transparent">
      <Head>
        <title>Netflix Redesigned - Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Image
        className="-z-10 !hidden opacity-60 sm:!inline"
        src="https://rb.gy/p2hphi"
        layout="fill"
        objectFit="cover"
      />

      <img
        className="absolute left-4 top-4 cursor-pointer object-contain md:left-10 md:top-6"
        src="https://rb.gy/ulxxee"
        alt="netflix-branding"
        width={150}
        height={150}
      />

      <form
        className="relative mt-24 space-y-8 rounded bg-black/75 py-10 px-6 md:mt-0 md:max-w-md md:px-14"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-4xl font-semibold">Sign In</h1>
        <section className="space-y-4">
          <label className="inline-block w-full" htmlFor="email">
            <input
              className="input"
              placeholder="Email"
              type="email"
              id="email"
              {...register('email', {
                required: true,
              })}
            />
            {errors.email && (
              <p className="p-1 text-[13px] font-light text-orange-500">
                Please enter a valid email address
              </p>
            )}
          </label>

          <label className="inline-block w-full" htmlFor="password">
            <input
              className="input"
              placeholder="Password"
              type="password"
              id="password"
              {...register('password', {
                required: true,
                minLength: 4,
                maxLength: 60,
              })}
            />
            {errors.password && (
              <p className="p-1 text-[13px] font-light text-orange-500">
                Your password must contain between 4 and 60 characters.
              </p>
            )}
          </label>
        </section>

        <button
          type="submit"
          className="w-full rounded bg-[#e50914] py-3 font-semibold"
          onClick={() => setLogin(true)}
        >
          Sign In
        </button>

        <section className="text-[gray]">
          New to Netflix?{' '}
          <button
            type="submit"
            className="text-white hover:underline"
            onClick={() => setLogin(false)}
          >
            Sign up now
          </button>
        </section>
      </form>
    </div>
  )
}

export default Login
