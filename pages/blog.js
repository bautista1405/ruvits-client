import { useState, useEffect, useCallback } from "react"
import { Alert, AlertIcon, Box, Flex, Input } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { NextSeo } from "next-seo"
import Fuse from "fuse.js"

// import { getAllFilesFrontMatter } from "../lib/posts"
import { tagColor } from "../components/UI/tagColor"
import { seo } from "config"
import TagComponent from "../components/UI/tag"
import BlogPost from "../components/blogPost"

const options = {
  includeScore: true,
  threshold: 0.3,
  ignoreLocation: true,
  keys: ["title"],
}

const Blog = ({ posts }) => {
  const router = useRouter()

  const fuse = new Fuse(posts, options)

  const [blogPost, setBlogPost] = useState(posts)
  const [searchValue, setSearchValue] = useState("")

  const filteredPosts = (tag) => {
    const blogResults = posts.filter((post) => post.tags.includes(tag))
    setBlogPost(blogResults)
  }

  const updateSearch = () => {
    const results = fuse.search(searchValue)
    const blogResults = results.map((res) => res.item)
    setBlogPost(blogResults)
  }

  const delayedSearch = useCallback(updateSearch, [searchValue])

  useEffect(() => {
    if (searchValue.length === 0) {
      return setBlogPost(posts)
    }
    delayedSearch()
  }, [delayedSearch])

  useEffect(() => {
    if (router.query?.tag !== undefined) {
      filteredPosts(router.query?.tag)
    }
  }, [router])

  const title = `Blog | ${seo.title}`
  const description = ''
  const url = `${seo.canonical}blog`

  return (
    <>
      <NextSeo
        title="Ruvits Blog"
        description={description}
        canonical={url}
        openGraph={{
          title,
          description,
          url,
        }}
      />
      <Flex justify="center" > 
      <Box
        as="section"
        fontSize="16px"
        px={{ md: "10", lg: "20", xl: "30" }}
        py="4"
        w={[800, 900, 1200]}
        color="gray.700"
        justify="center"
      >
        <Flex justify="center" marginTop="60px" mb={10}>
          <Input
            onChange={(e) => {
              setSearchValue(e.target.value)
            }}
            value={searchValue}
            borderColor="gray.500"
            variant="outline"
            placeholder="Buscar..."
            maxWidth="400px"
          />
        </Flex>

        {/* <Flex
          justify="center"
          align="center"
          direction="row"
          wrap="wrap"
          m="1.5rem 0"
          marginTop="80px"
        >
          {Object.keys(tagColor).map((tag, index) => {
            const color = tagColor[tag]

            return (
              <Box key={index}>
                <TagComponent color={color} onClick={() => filteredPosts(tag)}>
                  {tag}
                </TagComponent>
              </Box>
            )
          })}
        </Flex> */}

        {blogPost.length > 0 ? (
          <BlogPost posts={blogPost} />
        ) : (
          <Alert
            status="info"
            borderRadius="md"
            d="flex"
            justifyContent="center"
            mx="auto"
            maxWidth="500px"
            fontWeight="500"
          >
            <AlertIcon />
            No se encontró ningún artículo.
          </Alert>
        )}
      </Box>
      </Flex>
    </>
  )
}

// export async function getStaticProps() {
//   const data = await getAllFilesFrontMatter("blog")
//   const posts = data.sort(
//     (a, b) => Number(new Date(b.publishedAt)) - Number(new Date(a.publishedAt))
//   )

//   return { props: { posts } }
// }

export default Blog
