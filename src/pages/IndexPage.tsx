import FilterContainer from "../components/FilterContainer";

const IndexPage = () => {

    return (
        <div className="min-h-dvh flex flex-col relative">
            <header className="bg-gray-400 rounded-b-lg text-black flex items-center justify-center p-5">
                Header
            </header>

            <main className="max-w-[1400px] w-full flex-1 mx-auto px-5 mt-16 grid md:grid-cols-[350px_1fr] gap-10">
                <FilterContainer/>

                <div className="bg-gray-300 rounded-lg h-full text-center pt-10">
                    Content
                </div>
            </main>
        </div>
    )
}

export default IndexPage