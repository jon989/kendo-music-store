using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Web;
using System.Web.Mvc;
using System.Web.Mvc.Html;

namespace MvcMusicStore.Helpers
{
    public static class KendoTextValidatorHelper
    {
        public static MvcHtmlString KendoTextValidator<TModel, TResult>(this HtmlHelper<TModel> html, Expression<Func<TModel, TResult>> expr)
        {
            var result = new StringBuilder("<div class=\"editor-label\">");
            result.Append(html.LabelFor(expr).ToString());
            result.Append("</div><div class=\"editor-field\">");
            result.Append(createInputElement(expr));
            result.Append("</div>");
            return new MvcHtmlString(result.ToString());
        }

        private static StringBuilder createInputElement<TModel, TResult>(Expression<Func<TModel, TResult>> expr)
        {
            var memberExpr = (MemberExpression)expr.Body;
            var result = new StringBuilder();
            result.Append("<input type=\"text\" validationMessage=\" \" name=\"");
            result.Append(memberExpr.Member.Name);
            result.Append("\"");

            var attributes = memberExpr.Member.GetCustomAttributes(true);

            foreach (var attribute in attributes)
            {
                if (attribute is RequiredAttribute)
                {
                    result.Append(" required");
                }
                else if (attribute is StringLengthAttribute)
                {
                    var a = (StringLengthAttribute)attribute;
                    result.Append(" pattern=\".{").Append(a.MinimumLength).Append(",").Append(a.MaximumLength).Append("}\"");
                }
                else if (attribute is RegularExpressionAttribute)
                {
                    var a = (RegularExpressionAttribute)attribute;
                    result.Append(" pattern=\"").Append(a.Pattern).Append("\"");
                }
            }

            result.Append(" />");
            return result;
        }
    }
}