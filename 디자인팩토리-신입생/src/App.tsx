import { Navigate, Route, Routes } from "react-router-dom";
import { AppShell } from "./components/AppShell";
import { HomePage } from "./pages/HomePage";
import { UnitSelectPage } from "./pages/UnitSelectPage";
import { SearchResultsPage } from "./pages/SearchResultsPage";
import { ListingDetailPage } from "./pages/ListingDetailPage";
import { NewListingPage } from "./pages/NewListingPage";

export default function App() {
  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/units" element={<UnitSelectPage />} />
        <Route path="/search" element={<SearchResultsPage />} />
        <Route path="/listing/:id" element={<ListingDetailPage />} />
        <Route path="/sell/new" element={<NewListingPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppShell>
  );
}


