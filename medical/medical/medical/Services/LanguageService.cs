using Microsoft.Extensions.Localization;
using System;
using System.Reflection;

namespace medical.Services
{
    public class SharedResource
    {
    }

    public class LanguageService
    {
        private readonly IStringLocalizer<SharedResource> _localizer;

        public LanguageService(IStringLocalizerFactory factory)
        {
            _localizer = (IStringLocalizer<SharedResource>)factory.Create(typeof(SharedResource));
        }

        public string GetLocalizedString(string key)
        {
            return _localizer[key];
        }
    }
}
