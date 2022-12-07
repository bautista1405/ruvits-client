import { NextSeo } from "next-seo"
import { useRouter } from "next/router"
import {
  Box,
  Flex,
  Heading,
  Text,
  Link as ChakraLink,
  useColorModeValue,
  Icon,
} from "@chakra-ui/react"
import { MDXProvider } from "@mdx-js/react"
import { MdEdit } from "react-icons/md"
import dayjs from "dayjs"

// import hydrate from "next-mdx-remote/hydrate"
// import { MDXRemote } from 'next-mdx-remote'

import { getFiles, getFileBySlug } from "../../lib/posts"
import { seo } from "config"
import { tagColor } from "../../components/UI/tagColor"
// import MDXComponents from "../../components/MDXComponents"
import TagComponent from "../../components/UI/tag"
import Head from "next/head"

const BlogPost = ({ frontMatter, source }) => {
  const { push } = useRouter()

  const color = useColorModeValue("gray.700", "gray.400")

  // const content = { MDXComponents }

  // const title = `${frontMatter.title}`
  // const description = frontMatter.summary
  // const url = `${seo.canonical}blog/${frontMatter.slug}`

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon-32x32.png" sizes="16x16 32x32" type="image/png"/>
      </Head> 
      <NextSeo
        title="Cómo funciona Ruvits"
        description="Flujo compra/venta"
        // canonical={url}
        // openGraph={{
        //   title,
        //   description,
        //   url,
        //   type: "article",
        //   article: {
        //     publishedTime: frontMatter.publishedAt,
        //     modifiedTime: frontMatter.modifiedAt,
        //     tags: frontMatter.tags?.map((tag) => tag),
        //   },
        // }}
      />

      {/* <MDXRemote {...source} components={MDXComponents} /> */}
      <Flex justify="center" margin={["20px"]}>
        <Box
           as="section"
           px={{ md: "10", lg: "20", xl: "80" }}
           py="4"
           fontSize="20px"
           color="gray.700"
           w={[900, 900, 1300]}
           margin="auto"
           mt={10}
        >
          <Box as="header" textAlign="center">
            <Heading as="h1" py="4" size="2xl" >
              Cómo funciona Ruvits
            </Heading>

            <Flex direction="column">
              <Text fontSize="16px" color="gray.600" py="1">
                Ruvits /{" "}
                2022-11-10 /{" "}
                1 mins read
              </Text>
              {/* <Text py="1">
                {frontMatter.tags.map((tag) => {
                  const color = tagColor[tag]

                  return (
                    <TagComponent
                      color={color}
                      onClick={() =>
                        push({
                          pathname: "/blog/",
                          query: { tag },
                        })
                      }
                      key={tag}
                    >
                      {tag}
                    </TagComponent>
                  )
                })}
              </Text> */}
            </Flex>
          </Box>

          <Flex 
            justify="center"
            shadow="dark-lg"
            rounded={[null, "md"]}
            borderRadius="5px" 
            p={10}
            bg="#F9FAFB"
            mt={10}
          >
            <Box as="article">
              <Text>
                
              <br />

                1. El vendedor publica su producto en la plataforma.

                <br />
                <br />
                2. Un usuario compra el producto. (Acordate que para poder comprar un producto, tenés
                que estar registrado)

                <br />
                <br />
                3. Una vez confirmado el pago, el comprador recibe su producto por email (con el
                cual se registró en la plataforma).

                <br />
                <br />
                4. Se cobran las respectivas comisiones por la venta del producto (Mercado Pago
                y Ruvits), y lo demás va a la cuenta de Mercado Pago del vendedor.

                <br />
                <br />
                5. ¡Listo! Vendiste tu producto con éxito. La información de la venta figurará
                en tu dashboard.
              </Text>
            </Box>
          </Flex>
        </Box>
       </Flex> 
      
    </>
  )
}

// export const getStaticPaths = async () => {
//   const posts = await getFiles("blog")

//   return {
//     paths: posts.map((post) => ({
//       params: {
//         slug: post.replace(/\.mdx/, ""),
//       },
//     })),

//     fallback: false,
//   }
// }

// export const getStaticProps = async ({ params }) => {
//   const post = await getFileBySlug("blog", params.slug)

//   return { props: post }
// }

export default BlogPost