import type {
  CommunityGroupModal,
  ContentData,
  EventModalItem,
} from "@/types/content";
import defaults from "./content.defaults.json";
import cms from "@cms/content.json";

/** Ключи в data/content.json (Decap) отличаются от ContentData: communities, events */
type CmsJson = Partial<ContentData> & {
  communities?: CommunityGroupModal[];
  events?: EventModalItem[];
};

const c = cms as CmsJson;

const contentData: ContentData = {
  ...defaults,
  cards: c.cards ?? defaults.cards,
  contacts: c.contacts ?? defaults.contacts,
  text_blocks: c.text_blocks ?? defaults.text_blocks,
  project_practices: c.project_practices ?? defaults.project_practices,
  community_groups: c.communities ?? defaults.community_groups,
  journal_companies: c.journal_companies ?? defaults.journal_companies,
  journal_interviews: c.journal_interviews ?? defaults.journal_interviews,
  event_modal_items: c.events ?? defaults.event_modal_items,
  office_features: c.office_features ?? defaults.office_features,
};

export default contentData;
