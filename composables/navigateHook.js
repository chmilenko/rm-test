export function useNavigate() {
    const router = useRouter()
  
    const navigate = async (link, namePage, loadFunction) => {
      try {
        let id = link
        if (link.length > 1) {
          id = link.split('/').pop()
        }
        await loadFunction(id)
        router.push(`${namePage}-${id}`)
      } catch (error) {
        console.error(error)
      }
    }
  
    return { navigate }
  }