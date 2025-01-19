// comp
import { Section } from "@/components/shared/section";
import { Typo } from "@/components/shared/typography";
import { NextImage } from "@/components/shared/nextImage";


export const get_google_auth_url = () => {

  const ROOT_URL = 'https://accounts.google.com/o/oauth2/v2/auth';

  const options = {
    client_id: process.env.NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID || '',
    redirect_uri: process.env.NEXT_PUBLIC_GOOGLE_AUTH_REDIRECT_URI || '',
    response_type: 'code',
    scope: [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile'
    ].join(' '),
    access_type: 'offline',
    prompt: 'consent'
  }

  const qs = new URLSearchParams(options);

  return `${ROOT_URL}?${qs.toString()}`;

}


export const Not_Signed = () => {


  return (
    <Section
      content_sx={{minHeight: '80vh'}}
    >

      <Typo
        txt="You are not signed in"
        align="center"
        variant="h4"
      />

      <div
        style={{
          marginTop: '4rem', display: 'flex', justifyContent: 'center'
        }}
      >

        <NextImage
          src="/images/auth/not_signed_in.jpg"
          alt="not signed in"
          width={350}
          height={318}
        />

      </div>

      <div
        style={{
          marginTop: '8rem', marginBottom: '4rem',
          display: 'flex', justifyContent: 'center'
        }}
      >

        <a href={get_google_auth_url()}>
          <NextImage
            src="/images/auth/google_sign.png"
            alt="sign in with google"
            width={250}
            height={57}
          />
        </a>

      </div>

    </Section>
  )


};