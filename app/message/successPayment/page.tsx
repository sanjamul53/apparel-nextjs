import { NextImage } from "@/components/shared/nextImage";
import { Section } from "@/components/shared/section";
import { Typo } from "@/components/shared/typography";
import { ReactQueryProvider } from "@/lib/react_query/queryClient";
import { InvalideCache } from "./invalideCache";


export default function MessagePage() {


  return (
    <ReactQueryProvider>

      <Section>

        <div style={{minHeight: '80vh'}} >



          <div style={{ marginTop: '5rem', display: 'flex', justifyContent: 'center' }}>

            <NextImage src="/images/message/success.png" alt="success"
              width={150} height={150}
            />

          </div>

          <Typo txt="Successful Payment"
            variant="h3" align="center" margin="3rem 0 0 0"
            color="#3eb655"
          />

          <InvalideCache />

        </div>


      </Section>

    </ReactQueryProvider>
  )

}