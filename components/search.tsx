import { Filter, Search, X } from "lucide-react";
import { Input } from "./ui/input";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Badge } from "./ui/badge";
import { FilterModel } from "@/models/models";

export const SearchAndFilter = ({ filters }: { filters: FilterModel[] }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  return (
    <div className="mb-4">
      <div className="flex flex-row gap-2 md:gap-4">
        {/* Search Bar */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="text"
            placeholder="Search something delicious.."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Dropdown Filter */}
        <Select value={selectedFilter} onValueChange={setSelectedFilter}>
          <SelectTrigger className="md:w-[180px]">
            <Filter className="h-4 w-4 mr-2" />
            <span className="hidden md:block">
              <SelectValue placeholder="Filter by" />
            </span>
          </SelectTrigger>
          <SelectContent>
            {filters.map((filter: FilterModel) => (
              <SelectItem key={filter.value} value={filter.value}>
                {filter.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Active Filters Display */}
      <div className="w-full h-10 flex items-center">
        {selectedFilter !== "all" && (
          <div className="mt-4 flex flex-wrap gap-2">
            <Badge variant="secondary" className="gap-1">
              {filters.find((f) => f.value === selectedFilter)?.label}
              <button
                onClick={() => setSelectedFilter("all")}
                className="ml-1 hover:bg-muted rounded"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          </div>
        )}
      </div>
    </div>
  );
};
