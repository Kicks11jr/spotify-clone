// custom component imports from other components folder
import Header from "@/components/Header";

// custom component import from this components folder
import AccountContent from "./components/AccountContent";

// Functional component Account page
const Account = () => {
    return (
        // Main container
        <div 
        className="
            bg-neutral-900 
            rounded-lg 
            h-full 
            w-full 
            overflow-hidden
            overflow-y-auto
        "
        >
        <Header className="from-bg-neutral-900">
            <div className="mb-2 flex flex-col gap-y-6">
                {/* Page title */}
                <h1 className="text-white text-3xl font-semibold">
                    Account Settings
                </h1>
            </div>
        </Header>
        <AccountContent />
        </div>
    )
}

// export Account component
export default Account;