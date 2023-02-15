import global from "@/dictionary/global";
import messages from "@/dictionary/messages";
import ObjectHelper from "@/helpers/ObjectHelper";

const modules = {
  global,
  messages,
};

const DictionaryService = {
  get(module, property) {
    let value;

    try {
      value = ObjectHelper.find(modules[module], property);
    } catch (error) {
      value = "";
    }

    return value;
  },
};

export default DictionaryService;
